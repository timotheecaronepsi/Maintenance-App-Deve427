import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("/ListItems", "./Composants/ListItems.jsx"), route("/Cart", "./Composants/Cart.tsx")] satisfies RouteConfig;