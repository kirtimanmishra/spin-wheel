from rest_framework.exceptions import APIException


class InvalidParamException(APIException):
    pass


class ParamNotFoundError(InvalidParamException):
    status_code = 400
    default_detail = "This field is required."

    def __init__(self, param):
        detail = f"{param} is required field"
        super().__init__(detail=detail)


class InvalidWinnerParamError(InvalidParamException):
    status_code = 400

    def __init__(self, winner, valid_choices):
        self.winner = winner
        self.valid_choices = valid_choices
        self.detail = f"'{self.winner}' is not a valid choice. Valid choices are: {', '.join(self.valid_choices)}."
        super().__init__(detail=self.detail)
