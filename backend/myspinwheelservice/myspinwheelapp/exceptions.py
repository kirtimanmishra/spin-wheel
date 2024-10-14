# your_app/exceptions.py

from rest_framework.exceptions import APIException


class ParamNotFound(APIException):
    status_code = 400
    default_detail = "This field is required."
    default_code = "winner_not_found"


class InvalidWinnerParamError(APIException):
    status_code = 400

    def __init__(self, winner, valid_choices):
        self.winner = winner
        self.valid_choices = valid_choices
        self.detail = f"'{self.winner}' is not a valid choice. Valid choices are: {', '.join(self.valid_choices)}."
        super().__init__(detail=self.detail)
