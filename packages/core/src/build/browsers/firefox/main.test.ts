import { browserTypes } from "../../../_shared/types";
import { testBuildBrowser } from "../_shared/tests";
import firefox from "./main";

testBuildBrowser(
    browserTypes.firefox, 
    firefox,
)
