const Header = ({ title }) => {
  return (
    <nav className="bg-warning py-2">
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="display-5 fw-semibold mb-0 h1">
            GoTask <i className="fa-solid fa-rocket"></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
