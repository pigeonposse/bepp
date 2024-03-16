import { browserTypes } from "../../../_shared/types"
import { testBuildBrowser } from "../_shared/tests"
import opera from "./main";

testBuildBrowser(
    browserTypes.opera, 
    opera,
    () => {}
)
