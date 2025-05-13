import { FC } from "react";
import { IoMdArrowRoundUp as Arrow } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../providers/auth-provider";

const Header: FC = () => {
  const { user, loading, logout } = useAuth();

  return (
    <header>
      <div className="bg-dark-08 text-sm md:text-base text-center px-4 py-2  md:p-6 md:py-3 font-inter text-grey-60 flex justify-center gap-2">
        <span>Yeni ve güncel blog yazıları için bültenimize abone olun</span>

        <Arrow className="text-yellow-55 rotate-45" />
      </div>

      <div className="bg-dark-10 w-full padding-x py-5 flex justify-between items-center">
        <div>
          <img
            src="/logo.png"
            alt="logo"
            className="w-[100px] lg:w-[140px] 2xl:w-[180px]"
          />
        </div>

        <nav className="flex items-center gap-4 text-sm md:text-base text-grey-50">
          <NavLink to="/">Anasayfa</NavLink>
          <NavLink to="/own-blogs">Bloglarım</NavLink>
          <NavLink to="/about" className="max-md:hidden">
            Hakkımızda
          </NavLink>
          <NavLink to="/contact" className="max-md:hidden">
            İletişim
          </NavLink>
        </nav>

        <div>
          {!user && !loading ? (
            <Link
              to="/register"
              className="bg-yellow-55 text-black px-3 py-1 text-sm md:text-base rounded cursor-pointer"
            >
              Bize Katıl
            </Link>
          ) : (
            <div className="group relative text-sm md:text-base">
              <span>{user?.username}</span>

              <div className="hidden group-hover:block absolute top-5 -right-2 bg-black p-1 rounded-md">
                <Link to="/blog/create">
                  <button className="dropdown-link">Blog Yaz</button>
                </Link>

                <button onClick={logout} className="dropdown-link">
                  Çıkış Yap
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
