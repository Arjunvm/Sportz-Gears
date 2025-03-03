
import { useEffect, useState } from "react";
import axios from "axios";

export default function SportzGears() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (!user) {
      alert("Please log in to proceed with checkout.");
      return;
    }
    alert("Redirecting to payment gateway...");
  };

  const handleAuth = async () => {
    try {
      const url = isRegistering ? "http://localhost:5000/register" : "http://localhost:5000/login";
      const response = await axios.post(url, { email, password });
      setUser(response.data.user);
      alert(isRegistering ? "Registration successful!" : "Login successful!");
    } catch (error) {
      alert("Authentication failed. Check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center text-3xl font-bold p-6 bg-blue-600 text-white">
        SPORTZ Gears
      </header>
      <div className="max-w-6xl mx-auto flex justify-between items-center bg-white shadow-md p-4 mb-6">
        {user ? (
          <p>Welcome, {user.email}!</p>
        ) : (
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded"
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded"
            />
            <button 
              onClick={handleAuth} 
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {isRegistering ? "Sign Up" : "Login"}
            </button>
            <button 
              onClick={() => setIsRegistering(!isRegistering)} 
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              {isRegistering ? "Switch to Login" : "Switch to Sign Up"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
