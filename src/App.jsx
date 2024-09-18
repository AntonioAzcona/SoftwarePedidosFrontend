// Layout
import { Navbar, NavbarLeft } from "./ui";

import { AppRouter } from "./router/AppRouter";

export const App = () => {
  return (
    <>
      <div className="container-fluidcontainer-xxl">
        <div className="row">
          <Navbar />
        </div>

        <div className="row">
          <div className="col-3">
            <NavbarLeft />
          </div>
          <div className="col-9 p-5">
            <AppRouter />
          </div>
        </div>

        <div className="row">
          {/* Footer */}
        </div>
      </div>
    </>
  )
}
