import { browserTypes } from "_shared/types";
import { testBuildBrowser } from "../_shared/tests";
import edge from "./main";

testBuildBrowser(
    browserTypes.edge, 
    edge,
    () => {}
)
testBuildBrowser(
    browserTypes.edgeMv2, 
    edge.mv2,
    () => {}
)
