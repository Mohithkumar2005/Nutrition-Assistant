/* components/Footer.jsx */
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-sm opacity-75">&copy; {new Date().getFullYear()} NutriAssist MERN. All rights reserved.</p>
        <p className="text-xs mt-2 text-gray-400">Your Personal AI Nutritionist</p>
      </div>
    </footer>
  );
};

export default Footer;