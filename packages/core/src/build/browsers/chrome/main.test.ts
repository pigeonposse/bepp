import { browserTypes } from "../../../_shared/types";
import { testBuildBrowser } from "../_shared/tests";
import chrome from "./main";

testBuildBrowser(
	browserTypes.chrome, 
    chrome,
)
