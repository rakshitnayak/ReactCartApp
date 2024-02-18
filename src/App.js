import React, { Component } from "react";
import firebase from "firebase";

import Cart from "./Cart";
import Navbar from "./Navbar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
    };
    this.db = firebase.firestore();
  }

  componentDidMount() {
    // firebase
    //   .firestore()
    //   .collection("products")
    //   .get()
    //   .then((snapshot) => {
    //     console.log(snapshot);

    //     snapshot.docs.map((doc) => {
    //       console.log(doc.data());
    //     });

    //     const products = snapshot.docs.map((doc) => {
    //       const data = doc.data();
    //       data["id"] = doc.id;
    //       return data;
    //     });

    //     this.setState({
    //       products,
    //       loading: false,
    //     });
    //   });

    this.db
      .collection("products")

      // .where("price", "<", 1000)
      .orderBy("price", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot);

        snapshot.docs.map((doc) => {
          console.log(doc.data());
        });

        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });

        this.setState({
          products,
          loading: false,
        });
      });
  }

  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;

    // this.setState({
    //   products,
    // });
    const docRef = this.db.collection("products").doc(products[index].id);
    docRef
      .update({
        qty: products[index].qty + 1,
      })
      .then(() => {
        console.log("document updated");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }
    // {
    //   products[index].qty -= 1;
    // }

    // this.setState({
    //   products,
    // });

    const docRef = this.db.collection("products").doc(products[index].id);
    docRef
      .update({
        qty: products[index].qty - 1,
      })
      .then(() => {
        console.log("document updated");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  handleDeleteProduct = (id) => {
    const { products } = this.state;

    // const items = products.filter((item) => item.id !== id); //[{contains products which is not equal to id that is passed}]

    // this.setState({
    //   products: items,
    // });

    const docRef = this.db.collection("products").doc(id);
    docRef
      .delete()
      .then(() => {
        console.log("document deleted");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  getCartCount = () => {
    const { products } = this.state;
    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    });
    return count;
  };

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      if (product.qty > 0) {
        cartTotal = cartTotal + product.qty * product.price;
      }
      return " ";
    });
    return cartTotal;
  };

  addProduct = () => {
    this.db
      .collection("products")
      .add({
        img: " ",
        price: 900,
        qty: 3,
        title: "waching machine",
      })
      .then((docRef) => {
        console.log("products has been added", docRef);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {/*<button onClick={this.addProduct} style={{ padding: 20, fontSize: 20 }}> */}
        {/* Add a Product*/}
        {/*</button>*/}
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products...</h1>}
        <div
          style={{
            margin: 10,
            padding: 10,
            fontSize: 25,
          }}
        >
          Total Price: {this.getCartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
