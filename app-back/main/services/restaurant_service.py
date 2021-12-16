from bson.objectid import ObjectId

from main.db import MongoDB


class RestaurantService:
    """ doc string for RestaurantService """

    def __init__(self):
        super(RestaurantService, self).__init__()
        self.collection = "restaurants"
        self.mongo = MongoDB()

    def add(self, restaurant_obj):
        restaurant = self.mongo.find(self.collection, {"restaurant_name": restaurant_obj["restaurant_name"]})
        if not restaurant:
            return (
                self.mongo.save(self.collection, restaurant_obj),
                "Successfully created.",
                200,
            )
        else:
            return ("ok", "Restaurant already added to the library.", 400)

    def restaurants_list(self):
        return self.mongo.find(self.collection)

    def delete_restaurant(self, restaurant_id):
        return self.mongo.delete(self.collection, restaurant_id)

    def update_restaurant(self, restaurant_id, restaurant_obj):
        condition = {"$set": restaurant_obj}
        res, update_count = self.mongo.update(self.collection, restaurant_id, condition)

        if res:
            return ("success", res, "ok", 200)
        return ("error", "", "Something went wrong.", 400)

    def get_restaurant(self, restaurant_id):
        condition = {"_id": ObjectId(restaurant_id)}
        return self.mongo.find(self.collection, condition)
