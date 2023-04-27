import { execSync } from "child_process";
import { chdir } from "process";

function publish() {
  console.log("publishing......");
  chdir("dist/tracingJS");
  console.log("current dir: ", process.cwd());
  execSync("npm publish --access public", { stdio: "inherit" });
  console.log("published......");
}

publish();
