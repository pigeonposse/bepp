import { browserTypes } from "../../../_shared/types";
import { testBuildBrowser } from "../_shared/tests";
import brave from "./main";

testBuildBrowser(
    browserTypes.brave, 
    brave,
    () => {}
)
