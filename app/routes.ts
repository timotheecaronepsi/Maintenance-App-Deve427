import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("/ListItems", "./Composants/ListItems.tsx"), route("/Cart", "./Composants/Cart.tsx")] satisfies RouteConfig;