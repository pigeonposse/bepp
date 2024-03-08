import { testBuildBrowser } from "../_shared/tests";
import chromium from "./main";

testBuildBrowser(
    'chromium', 
    chromium,
    () => {}
)