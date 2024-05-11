# -*- coding: utf-8 -*-
"""
Created on Sat May 11 16:01:18 2024

@author: fourn
"""

# -*- coding: utf-8 -*-
"""
Client for an API

Created on Sun Nov 13 16:21:25 2022

@author: Armin Theiler
"""

import requests
import urllib.parse
import time


class API:
    def __init__(self, scheme, netloc, headers):
        """
        Client for API

        Parameters
        ----------
        scheme : str
             URL scheme specifier.
        netloc : str
            Network location part.
        headers : dict
            A dictionary of HTTP headers to send to the specified url.

        """
        self._scheme = scheme
        self._netloc = netloc
        self._headers = headers

    def get(self, path, params, query_dict, fragment):
        """
        Method sends a GET request to the specified url.

        Parameters
        ----------
        path : str
            Hierarchical path.
        params : str
            Parameters for last path element.
        query_dict : dict
            Dictionary of Query components.
        fragment : str
            Fragment identifier.

        Returns
        -------
        result_json : dict
            Returns a JSON object of the result - If the result was written in
            JSON format, if not it raises an error.

        """
        query_string = urllib.parse.urlencode(query_dict)
        url_tuple = (
            self._scheme,
            self._netloc,
            path,
            params,
            query_string,
            '',
            )
        url_string = urllib.parse.urlunparse(url_tuple)
        response = requests.get(url_string, headers=self._headers)
        print(time.asctime(), url_string, response.status_code)
        result_json = response.json()
        return result_json


if __name__ == '__main__':
    scheme = 'https'
    netloc = 'opendata.myswitzerland.io'
    headers = {
        "accept": "application/json",
        "x-api-key": "zbrLBtYCsk1G5zt3OOGZY1Aqnr9uHcv69N2KGBXd"
        }

    api = API(scheme, netloc, headers)

    path = 'v1/attractions'
    query_dict = {
        'lang': 'fr-CH',
        'geo.bbox': '47.291136,8.3873749,47.456678,8.6702728'
        }

    result_json = api.get(path, '', query_dict, '')
