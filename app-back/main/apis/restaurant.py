from flask_restplus import Namespace, Resource, fields

api = Namespace("Restaurants", description="Restaurants related APIs")
from flask import request
from flask_jwt_extended import jwt_required

from core.utils import Utils
from main.services.restaurant_service import RestaurantService

restaurant_model = api.model(
    "RestaurantModel",
    {
        "restaurant_name": fields.String(description="Restaurant name", required=True),
        "cuisine": fields.String(description="Name of the cuisine", required=True),
        "borough": fields.String(description="borough of restaurant", required=True),
        "address": {
            "building": fields.String(description="building name/number", required=True),
            "street": fields.String(description="street name", required=True),
            "postcode": fields.String(description="Postcode", required=True),
        },
    },
)


@api.route("/restaurant")
class NewRestaurant(Resource):
    """docstring for NewRestaurant."""

    def __init__(self, arg):
        super(NewRestaurant, self).__init__(arg)
        self.utils = Utils()
        self.restaurant_service = RestaurantService()

    @jwt_required
    @api.expect(restaurant_model)
    def post(self):
        """ Save new restaurant object into database """
        if '_id' in request.json: del request.json['_id']
        
        res, msg, code = self.restaurant_service.add(request.json)

        return {
            "status": self.utils.http_status(code),
            "res": res,
            "message": msg,
        }, code

    @jwt_required
    @api.doc(parser=None)
    def get(self):
        """ Get list of restaurants """
        restaurants = self.restaurant_service.restaurants_list()
        return {"status": "success", "res": restaurants}, 200


update_restaurant_model = api.model(
    "RestaurantUpdateModel",
    {
        "restaurant_name": fields.String(description="Restaurant name", required=False),
        "cuisine": fields.String(description="Name of the cuisine", required=False),
        "borough": fields.String(description="borough of restaurant", required=False),
        "address": {
            "building": fields.String(description="building name/number", required=False),
            "street": fields.String(description="street name", required=False),
            "postcode": fields.String(description="Postcode", required=False)
        },
    },
)


@api.route("/restaurant/<string:restaurant_id>")
class Restaurant(Resource):
    """docstring for Restaurant."""

    def __init__(self, arg):
        super(Restaurant, self).__init__(arg)
        self.restaurant_service = RestaurantService()

    # @jwt_required
    @api.expect(update_restaurant_model)
    def put(self, restaurant_id):
        """ Update restaurant based on restaurant_id. 5e86d84da011b26c2082e0c9 """
        if not restaurant_id:
            api.abort(400, "restaurant_id is missing.", status="error")

        status, obj, msg, code = self.restaurant_service.update_restaurant(restaurant_id, request.json)

        return {"status": status, "data": obj, "message": msg}, code

    @jwt_required
    def get(self, restaurant_id):
        """ Get restaurant object based on restaurant_id """
        restaurant = self.restaurant_service.get_restaurant(restaurant_id)

        return {"status": "success", "res": restaurant}, 200

    @jwt_required
    def delete(self, restaurant_id):
        """ Delete a restaurant object based on ID. """
        if not restaurant_id:
            api.abort(400, f"restaurant_id is required.", status="error")

        res, msg = self.restaurant_service.delete_restaurant(restaurant_id)

        if res:
            return {"status": "success", "data": res, "message": msg}, 200
        else:
            return api.abort(400, msg, status="error")


# class NullableString(fields.String):
#     __schema_type__ = ['string', 'null']
#     __schema_example__ = 'nullable string'
