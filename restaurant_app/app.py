from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Restaurant WhatsApp number in international format, no '+', no spaces.
# e.g. country code 91 + 10 digit number for India
RESTAURANT_WHATSAPP_NUMBER = "7853888327"  # <-- change this to your real number

MENU = [
    {"id": 1, "name": "Margherita Pizza", "price": 249, "category": "Pizza"},
    {"id": 2, "name": "Farmhouse Pizza", "price": 299, "category": "Pizza"},
    {"id": 3, "name": "Veg Burger", "price": 129, "category": "Burgers"},
    {"id": 4, "name": "Chicken Burger", "price": 159, "category": "Burgers"},
    {"id": 5, "name": "French Fries", "price": 99, "category": "Sides"},
    {"id": 6, "name": "Cold Coffee", "price": 89, "category": "Beverages"},
    {"id": 7, "name": "Paneer Tikka", "price": 219, "category": "Starters"},
    {"id": 8, "name": "Veg Biryani", "price": 199, "category": "Main Course"},
]


@app.route("/")
def index():
    return render_template(
        "index.html",
        menu=MENU,
        whatsapp_number=7853888327,
    )


@app.route("/api/menu")
def api_menu():
    return jsonify(MENU)


if __name__ == "__main__":
    app.run(debug=True)
