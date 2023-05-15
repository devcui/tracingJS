import { execSync } from "child_process";
import { chdir } from "process";

function publish() {
  console.log("publishing......");
  chdir("dist/tracingJS");
  console.log("current dir: ", process.cwd());
  execSync("npm publish --access public", { stdio: "inherit" });
  console.log("published......");
  execSync("curl -X PUT https://npmmirror.com/sync/@yelon/tracingjs?sync_upstream=true");
}

publish();
