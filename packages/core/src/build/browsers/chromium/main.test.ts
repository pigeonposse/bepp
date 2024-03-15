import { browserTypes } from "_shared/types";
import { testBuildBrowser } from "../_shared/tests";
import chromium from "./main";

testBuildBrowser(
    browserTypes.chromiumMv2, 
    chromium,
    () => {}
)
testBuildBrowser(
    browserTypes.chromiumMv2, 
    chromium.mv2,
    () => {}
)
