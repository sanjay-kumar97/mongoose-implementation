const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    description: { type: String, required: true, minlength: 10 },
    image: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("formattedPrice").get(function () {
  return `$${this.price.toFixed(2)}`;
});

productSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

productSchema.index({ category: 1 });

module.exports = model("Product", productSchema);
