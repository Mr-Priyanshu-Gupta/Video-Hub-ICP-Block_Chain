// Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-gray-300 py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Video hub</h2>
          <p className="text-sm">
            Your one-stop platform for binge-worthy movies, shows, and creators.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-medium text-white mb-2">Explore</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Trending</a></li>
            <li><a href="#" className="hover:text-white">Creators</a></li>
            <li><a href="#" className="hover:text-white">Subscriptions</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-medium text-white mb-2">Support</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Terms of Use</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-medium text-white mb-2">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#"><i className="fab fa-facebook hover:text-white"></i></a>
            <a href="#"><i className="fab fa-twitter hover:text-white"></i></a>
            <a href="#"><i className="fab fa-instagram hover:text-white"></i></a>
            <a href="#"><i className="fab fa-youtube hover:text-white"></i></a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Video_hub. All rights reserved. Created by vivek Agrawal and Priynahsu Gupta
      </div>
    </footer>
  );
}
