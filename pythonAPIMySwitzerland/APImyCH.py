# -*- coding: utf-8 -*-
"""
Client for ST OpenData API (https://developer.myswitzerland.io)

Created on Thu Dec 29 21:03:04 2022

@author: Armin Theiler
"""

from api import API


class APImyCH:
    def __init__(self, xapikey):
        """
        Object for requests on the ST OpenData API

        Parameters
        ----------
        xapikey : str
            x-api-key for autification.

        Returns
        -------
        None.

        """
        scheme = 'https'
        netloc = 'opendata.myswitzerland.io'
        headers = {
            "accept": "application/json",
            "x-api-key": xapikey
            }
        self._api = API(scheme, netloc, headers)

    def _get(self, path, boundingbox_nw, boundingbox_se, lang):
        """
        Method sends a GET request to get data in a boundingbox.

        Parameters
        ----------
        path : str
            Hierarchical path.
        boundingbox_nw : tuple of float
            Geographic coordinates of the north-west corner.
        boundingbox_se : tuple of float
            Geographic coordinates of the south-east corner.
        lang : str
            Desired result language (ISO 639-1), optionally appended with "-"
            and a ISO 3166-1 alpha-2 country code (region).

        Returns
        -------
        result_json : dict
            Returns a JSON object of the result - If the result was written in
            JSON format, if not it raises an error.

        """
        bbox = boundingbox_nw + boundingbox_se
        query_dict = {
            'lang': lang,
            'geo.bbox': ','.join(str(el) for el in bbox)
            }
        result_json = self._api.get(path, '', query_dict, '')
        return result_json

    def get_attractions(self, boundingbox_nw, boundingbox_se, lang):
        """
        Method sends a GET request to get attractions in a boundingbox.

        Parameters
        ----------
        boundingbox_nw : tuple of float
            Geographic coordinates of the north-west corner.
        boundingbox_se : tuple of float
            Geographic coordinates of the south-east corner.
        lang : str
            Desired result language (ISO 639-1), optionally appended with "-"
            and a ISO 3166-1 alpha-2 country code (region).

        Returns
        -------
        result_json : dict
            Returns a JSON object of the result - If the result was written in
            JSON format, if not it raises an error.

        """
        path = 'v1/attractions/'
        result_json = self._get(path, boundingbox_nw, boundingbox_se, lang)
        return result_json

    def get_destinations(self, boundingbox_nw, boundingbox_se, lang):
        """
        Method sends a GET request to get destinations in a boundingbox.

        Parameters
        ----------
        boundingbox_nw : tuple of float
            Geographic coordinates of the north-west corner.
        boundingbox_se : tuple of float
            Geographic coordinates of the south-east corner.
        lang : str
            Desired result language (ISO 639-1), optionally appended with "-"
            and a ISO 3166-1 alpha-2 country code (region).

        Returns
        -------
        result_json : dict
            Returns a JSON object of the result - If the result was written in
            JSON format, if not it raises an error.

        """
        path = 'v1/destinations/'
        result_json = self._get(path, boundingbox_nw, boundingbox_se, lang)
        return result_json

    def get_tours(self, boundingbox_nw, boundingbox_se, lang):
        """
        Method sends a GET request to get tours in a boundingbox.

        Parameters
        ----------
        boundingbox_nw : tuple of float
            Geographic coordinates of the north-west corner.
        boundingbox_se : tuple of float
            Geographic coordinates of the south-east corner.
        lang : str
            Desired result language (ISO 639-1), optionally appended with "-"
            and a ISO 3166-1 alpha-2 country code (region).

        Returns
        -------
        result_json : dict
            Returns a JSON object of the result - If the result was written in
            JSON format, if not it raises an error.

        """
        path = 'v1/tours/'
        result_json = self._get(path, boundingbox_nw, boundingbox_se, lang)
        return result_json


if __name__ == '__main__':
    apimych = APImyCH('zbrLBtYCsk1G5zt3OOGZY1Aqnr9uHcv69N2KGBXd')
    # boundingbox_nw = (46.84871605684986, 9.793332725450599)
    boundingbox_nw = (46.44124, 6.98694)
    
    # boundingbox_se = (46.67910271939268, 9.963142493959074)
    boundingbox_se = (46.41935, 6.95736)
    
    
    lang = 'fr-CH'
    result_json1 = apimych.get_tours(boundingbox_nw, boundingbox_se, lang)
    result_json2 = apimych.get_destinations(boundingbox_nw, boundingbox_se, lang)
    result_json3 = apimych.get_attractions(boundingbox_nw, boundingbox_se, lang) # explication
    
