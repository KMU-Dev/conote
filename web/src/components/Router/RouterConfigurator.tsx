import { useLocation, useNavigate } from "react-router-dom";

let location: ReturnType<typeof useLocation>;
let navigate: ReturnType<typeof useNavigate>;

export function RouterConfigurator() {
    location = useLocation();
    navigate = useNavigate();

    return <></>;
}

export { location, navigate };

