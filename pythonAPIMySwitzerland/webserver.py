# -*- coding: utf-8 -*-
"""
Created on Sat May 11 16:50:03 2024

@author: fourn
"""

#!/usr/bin/python3

from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import json
import psycopg2
import urllib.parse
from random import randint
from APImyCH import APImyCH
from trCH import wgs84_2_mn95_approx

hostName = "localhost"
hostPort = 8000

# x-api-key for ST OpenData API
# (register on https://developer.myswitzerland.io)
MYCH_XAPIKEY = 'zbrLBtYCsk1G5zt3OOGZY1Aqnr9uHcv69N2KGBXd'  # collez ici votre API Key

# Il persiste un probleme : quand nous utilisons self.send_error() ceci 
# provoque un erreur : CORS Missing Allow Origin.

class MyServer(BaseHTTPRequestHandler):

    # Connexion à la base de données
    data = {}
    try:
        conn = psycopg2.connect(
            "dbname='game' "
            "user='postgres' "
            "host='localhost' "
            "password='postgres'"
            )
        cursor = conn.cursor()
    except:
        print("I am unable to connect to the database")

    # Initialiser le client pour API de suisse tourisme
    apimych = APImyCH(MYCH_XAPIKEY)

    # Contient les headers standards pour répondre du JSON
    def _set_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    # Nécessaire pour le POST.
    def do_OPTIONS(self):
        self.send_response(200)
        self._set_headers()

    # GET pour demander des donnees
    def do_GET(self):
        # lire la requette du client
        params = urllib.parse.parse_qs(self.path[2:])
        dataset = params['dataset'][0]

        # appel de la fonction selon le dataset demande
        if dataset == 'sessionid.json':
            self._get_sessionuuid()
        else:
            session_uuid = params['session'][0]
            if dataset == 'locality.json':
                self._get_locality(session_uuid)
            elif dataset == 'correction.json':
                self._get_correction(session_uuid)
            elif dataset == 'attraction_locality.geojson':
                id_loc = params['id_loc'][0]
                self._get_attraction_locality(session_uuid, id_loc)
            else:
                msg = 'Le dataset demande n\'existe pas sur le serveur.'
                self.send_error(400, msg)

    # PUT is for updating data.
    def do_PUT(self):
        # Gets the size of data
        content_length = int(self.headers['Content-Length'])
        # Gets the data itself
        put_data = self.rfile.read(content_length)
        # decoder les donnees en dictionnaire
        data = json.loads(put_data.decode('utf8'))

        # choix de la fonction
        if 'session' in data.keys():
            if 'user_pos' in data['session'].keys():
                self._put_userpos(data['session'])
            else:
                self.send_error(400)
        else:
            self.send_error(401)

    def _send_json2front(self):
        """
        Envoi de la reponse au front

        Returns
        -------
        None.

        """
        self.send_response(200)
        self._set_headers()
        # json.dumps converti le dictionnaire python en JSON
        self.wfile.write(bytes(json.dumps(self.data), "utf-8"))

    def _db_sql_request(self, sql_request):
        """
        Execute une requete SQL pour obtenir des donnees

        Parameters
        ----------
        sql_request : str
            Requete SQL.

        Returns
        -------
        data : dict
            Donnees.

        """
        self.cursor.execute(sql_request)
        data = self.cursor.fetchall()
        return data

    def _get_sessionuuid(self):
        """
        Demande d'une UUID de session (Creation d'une nouvelle session)

        La UUID est stockee sous self.data avec key 'session'

        Returns
        -------
        None.

        """
        # faire requete
        sql_request = 'INSERT INTO public.sessions ' \
            '(localities, i_round, user_pos_north, user_pos_east) ' \
            'VALUES (ARRAY( ' \
            'SELECT uuid FROM public.locality ORDER BY RANDOM() LIMIT 11), ' \
            '0, \'{1}\', \'{1}\') RETURNING uuid;'
        session_uuid = self._db_sql_request(sql_request)
        # enregistrer les modifications de la base de donnee
        self.conn.commit()
        # preparer la reponse au client
        data2send = {
            'session': session_uuid[0][0],
            }
        self.data = data2send
        self._send_json2front()

    def _get_locality(self, session_uuid):
        """
        Demande du nom de la prochaine localite.

        La nom est stockee sous self.data avec key 'locality'

        Parameters
        ----------
        session_uuid : str
            UUID de la session.

        Returns
        -------
        None.

        """
        # mise a jour compteur de tours de jeu
        sql_request = 'UPDATE public.sessions ' \
            'SET i_round = i_round + 1 ' \
            'WHERE uuid = \'{:s}\' RETURNING i_round;'.format(session_uuid)
        i_round = self._db_sql_request(sql_request)[0][0]
        self.conn.commit()

        # requete du prochain nom de localite
        if i_round <= 11:
            sql_request = 'SELECT langtext FROM locality ' \
                'WHERE locality.uuid = (SELECT localities[{:d}] ' \
                'FROM sessions WHERE sessions.uuid = \'{:s}\');'.format(
                    i_round, session_uuid
                    )
            name = self._db_sql_request(sql_request)[0][0]
            # preparer reponse au client
            data2send = {
                'locality': name,
                }
            self.data = data2send
            self._send_json2front()
        else:
            msg = 'La partie demande est deja termine.'
            self.send_error(409, msg)

    def _get_correction(self, session_uuid):
        """
        Demande de la correction de la partie.

        Parameters
        ----------
        session_uuid : TYPE
            DESCRIPTION.

        Returns
        -------
        None.

        """
        # Terminer le jeu (blocker ajout de nouvelles positions)
        sql_request = 'UPDATE public.sessions ' \
            'SET i_round = 12 ' \
            'WHERE uuid = \'{:s}\';'.format(session_uuid)
        self.cursor.execute(sql_request)
        self.conn.commit()
        # Tequete des donnes de la session
        sql_request = 'SELECT localities, user_pos_north, user_pos_east ' \
            'FROM public.sessions WHERE uuid = \'{:s}\';'.format(session_uuid)
        session_data = self._db_sql_request(sql_request)[0]
        localities_uuid = session_data[0].strip('{}').split(',')
        user_pos_north = session_data[1]
        user_pos_east = session_data[2]
        # changer indice (postgres to python)
        user_pos_north = [el-1 for el in user_pos_north]
        user_pos_east = [el-1 for el in user_pos_east]

        # creation du dictionaire des localites (geojson)
        localities_names_pos = []
        for i, uuid in enumerate(localities_uuid):
            sql_request = \
                'SELECT langtext, ROUND(ST_X(geom)), ROUND(ST_Y(geom)) ' \
                'FROM public.locality WHERE uuid = \'{:s}\';'.format(uuid)
            loc_i = self._db_sql_request(sql_request)[0]
            feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [loc_i[1], loc_i[2]]
                    },
                "properties": {
                    "name": loc_i[0],
                    "id": i
                    }
                }
            localities_names_pos.append(feature)
        # faire la correction
        correction = []
        for cardan, user_pos in enumerate((user_pos_east, user_pos_north)):
            correction_cardan = self._correction(
                user_pos, cardan, localities_names_pos
                )
            correction += correction_cardan
        # preparer reponse au client
        data2send = {
            'correction': correction,
            'localities': localities_names_pos,
            }
        self.data = data2send
        self._send_json2front()

    def _correction(self, user_pos, cardan, localities):
        """
        Correction des positions donnees par l'utilisateur

        Parameters
        ----------
        user_pos : list of int
            index des positions.
        cardan : int
            identifiant du cardan.
        localities : dict
            Localities en geojson.

        Returns
        -------
        correction_cardan : TYPE
            DESCRIPTION.

        """
        correction_cardan = []
        nb_loc = len(user_pos)
        if nb_loc > 1:
            for i in range(nb_loc - 1):
                loc1 = user_pos[i]
                loc2 = user_pos[i + 1]
                pos1 = localities[loc1]["geometry"]["coordinates"][cardan]
                pos2 = localities[loc2]["geometry"]["coordinates"][cardan]
                correct = pos2 >= pos1
                correction_i = (loc1, loc2, cardan, correct)
                correction_cardan.append(correction_i)
        return correction_cardan

    def _get_attraction_locality(self, session_uuid, id_loc):
        """
        Demande attrcation de la locality.

        La geojson des attractions est stockee sous self.data

        Parameters
        ----------
        session_uuid : str
            UUID de la session.
        id_loc : str
            ID de la localite.

        Returns
        -------
        None.

        """
        # requette de la ronde enregistré dans la base de donnee
        sql_request = 'SELECT i_round ' \
            'FROM public.sessions WHERE uuid = \'{:s}\';'.format(session_uuid)
        i_round = self._db_sql_request(sql_request)[0][0]

        # si le jeu est termine
        if i_round > 11:
            # requette des la boundingbox de la localite
            sql_request = 'SELECT ST_AsText(boundbox_nw), ' \
                'ST_AsText(boundbox_se) FROM locality ' \
                'WHERE locality.uuid = (SELECT localities[{:d}] ' \
                'FROM sessions WHERE sessions.uuid = \'{:s}\');'.format(
                    int(id_loc)+1, session_uuid
                    )
            boundingbox = self._db_sql_request(sql_request)

            boundingbox_nw = boundingbox[0][0]
            boundingbox_nw = self._asText2tuple(boundingbox_nw)

            boundingbox_se = boundingbox[0][1]
            boundingbox_se = self._asText2tuple(boundingbox_se)

            # faire les requettes sur myswitzerland
            lang = 'fr-CH'
            result_json = self.apimych.get_attractions(
                boundingbox_nw, boundingbox_se, lang
                )
            data_attraction = result_json['data']
            result_json = self.apimych.get_destinations(
                boundingbox_nw, boundingbox_se, lang
                )
            data_destionation = result_json['data']
            result_json = self.apimych.get_tours(
                boundingbox_nw, boundingbox_se, lang
                )
            data_tours = result_json['data']

            # compilation de la reponse au front
            data_all = data_attraction + data_destionation + data_tours
            geojson = self._attraction2geojson(data_all)

            self.data = geojson
            self._send_json2front()
        else:
            msg = 'La partie est encore en cours (acces refuse).'
            self.send_error(403, msg)

    def _attraction2geojson(self, data_json):
        """
        Response (json) from API myswitzerland to geojson

        Parameters
        ----------
        data_json : list
            List 'data' de la reponse de API myswitzerland.

        Returns
        -------
        geojson : dict
            Geojson.

        """
        features = []
        coord_set = set()
        for element in data_json:

            name = element['name']
            # assuer que un lien d'image est envoye
            if 'photo' in element:
                photo = element['photo']
            elif (
                    'switzerlandMobility' in element
                    and 'logo' in element['switzerlandMobility']
                    ):
                photo = element['switzerlandMobility']['logo']
            else:
                photo = 'https://www.myswitzerland.com' \
                    '/-/media/st/common/brandingsquares/' \
                    'brandingsquarefr320.png'
            url = element['url']
            long = element['geo']['longitude']
            lat = element['geo']['latitude']
            # transformation des coordonnees et eviter superposition des points
            e, n = wgs84_2_mn95_approx(lat, long)
            coord = (int(e), int(n))
            while coord in coord_set:
                en = e + randint(-500, +500)
                nn = n + randint(-500, +500)
                coord = (en, nn)
            coord_set.add(coord)

            feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": coord
                    },
                "properties": {
                    "name": name,
                    "url": url,
                    "photo": photo
                    }
                }
            features.append(feature)
        geojson = {
            "type": "FeatureCollection",
            "features": features
            }
        return geojson

    def _asText2tuple(self, asText):
        """
        Coordinates Point AsText to tuple of float

        Parameters
        ----------
        asText : str
            Coordinates of point AsText (lon, lat).

        Returns
        -------
        tuple_float : tuple of float
            Coordinates of point (lat, lon).

        """

        asText = asText.strip('POINT()')
        list_string = asText.split(" ")
        tuple_float = (
            float(list_string[1]),
            float(list_string[0])
            )
        return tuple_float

    def _put_userpos(self, data_session):
        """
        Ajouter la position choisi par l'utilisateur au array sur la bd

        Parameters
        ----------
        data_session : dict
            Donnes pour la mise a jour.
                session : str
                    UUID session
                id_loc : int
                    index localite dans la session
                user_cardan : int
                    identifiant du cardan
                user_pos : int
                    index de la position choisi par l'utilisateur

        Returns
        -------
        None.

        """
        if data_session['user_cardan'] not in (0, 1):
            msg = 'user_cardan doit etre dans [0, 1].'
            self.send_error(409, msg)
        else:
            session_uuid = data_session['session']
            id_loc = data_session['id_loc']
            user_pos = data_session['user_pos'] + 1

            # demande da la ronde enregistre dans la bd
            sql_request = 'SELECT i_round, cardinality(user_pos_east), ' \
                'cardinality(user_pos_north) FROM public.sessions ' \
                'WHERE uuid = \'{:s}\';'.format(session_uuid)
            i_round = self._db_sql_request(sql_request)[0][0]
            len_east = self._db_sql_request(sql_request)[0][1]
            len_north = self._db_sql_request(sql_request)[0][2]

            # choix du atribut a mettre a jour
            if data_session['user_cardan'] == 0:
                field = 'user_pos_east'
                len_array = len_east
            elif data_session['user_cardan'] == 1:
                field = 'user_pos_north'
                len_array = len_north

            # verification de la coherence de la ronde avec la demande
            if i_round == id_loc and user_pos in range(1, len_array+2):
                # mise a jour
                sql_request = 'UPDATE public.sessions ' \
                    'SET {:s} = array_set_at({:s}, {:d}, {:d}) ' \
                    'WHERE uuid = \'{:s}\';'.format(
                        field, field, user_pos, id_loc, session_uuid
                        )
                self.cursor.execute(sql_request)
                self.conn.commit()
                self.send_response(204)
                self._set_headers()
            else:
                msg = 'id_loc ou user_pos ne corresponde pas avec le ' \
                    'progres enregistre sur le serveur.'
                self.send_error(409, msg)


myServer = HTTPServer((hostName, hostPort), MyServer)
print(time.asctime(), "Server Starts - %s:%s" % (hostName, hostPort))

try:
    myServer.serve_forever()
except KeyboardInterrupt:
    pass

myServer.server_close()
print(time.asctime(), "Server Stops - %s:%s" % (hostName, hostPort))
