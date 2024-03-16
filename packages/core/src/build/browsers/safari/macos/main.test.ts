
import { browserTypes } from "../../../../_shared/types"
import { testBuildBrowser } from "../../_shared/tests";
import safari from "./main";

testBuildBrowser(
    browserTypes.safari, 
    safari,
)
