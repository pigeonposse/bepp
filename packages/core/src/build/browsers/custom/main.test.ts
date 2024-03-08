import { testBuildBrowser } from "../_shared/tests";
import custom from "./main";

testBuildBrowser(
    'custom', 
    custom,
    () => {}
)