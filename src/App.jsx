// Layout
import { Header, NavbarLeft } from "./ui";

import { AppRouter } from "./router/AppRouter";

export const App = () => {
  return (
    <>
      <div className="container-fluidcontainer-xxl">
        <div className="row">
          <Header />
        </div>

        <div className="row">
          <div className="col-3">
            <NavbarLeft />
          </div>
          <div className="col-9 p-5">
            {/* TODO: Routing a los diferentes componentes */}
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
