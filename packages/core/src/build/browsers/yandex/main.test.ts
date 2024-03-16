import { browserTypes } from "../../../_shared/types"
import { testBuildBrowser } from "../_shared/tests";
import yandex from "./main";

testBuildBrowser(
    browserTypes.yandex, 
    yandex,
    () => {}
)
