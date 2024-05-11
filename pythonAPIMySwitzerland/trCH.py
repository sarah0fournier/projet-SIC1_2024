# -*- coding: utf-8 -*-
"""
Selon le document:
    Formules approchees pour la transformation
    entre WGS84 et des coordonnees de projection
    suisses MN95.
    Décembre 2016.
    Wabern : Geodesie, Office fédéral de topographie swisstopo.
    Disp. à l'adresse:
        https://www.swisstopo.admin.ch/content/swisstopo-internet/fr/topics/survey/reference-systems/switzerland/_jcr_content/contentPar/tabs/items/dokumente_publikatio/tabPar/downloadlist/downloadItems/516_1459343097192.download/ch1903wgs84_f.pdf

@author: Armin Theiler
"""


def wgs84_2_mn95_approx(lat, lon):
    """
    Conversion de coordonnées ellipsoidales
    WGS84 en coordonnées de projection suisses MN95

        Selon formules approchées (Précision de l'ordre du mètre)

    Parameters
    ----------
    lat : float
        Latitude WGS84 (dd).
    lon : TYPE
        Longitude WGS84 (dd).

    Returns
    -------
    e_approx : int
        E MN95 approx. (m).
    n_approx : int
        N MN95 approx. (m).

    """
    lats = lat * 3600
    lons = lon * 3600
    las = (lats - 169028.66) / 10000
    los = (lons - 26782.5)/10000

    e_approx = 2600072.37 \
        + 211455.93 * los \
        - 10938.51 * los * las \
        - 0.36 * los * las**2 \
        - 44.54 * los**3

    n_approx = 1200147.07 \
        + 308807.95 * las \
        + 3745.25 * los**2 \
        + 76.63 * las**2 \
        - 194.56 * los**2 * las \
        + 119.79 * las**3

    return e_approx, n_approx
