


<pre><code class="language-rust">
//! ## Usage
//! To display the contents of a folder:
//! `` `sh
//! ./llm-system-fuction resource-list -d path_dir
//! or short
//! ./l lm-system-fuction rl -d path_dir
//! ```
//!
//! To display the contents of a file:
//! `` `sh
//! ./llm-system-fuction file-content -f path_file.test.js
//! or short
//! ./llm-system-fuction fc -f path_file.test.js
//! `` `
//!
//! To execute command `yarn test`
//! `` `sh
//! ./llm-system-fuction yarn-test -d path_dir_package_json -f path_file.test.js
//! or short
//! ./llm-system-fuction yt -d path_dir_package_json -f path_file.test.js
//! or use full path to `yarn`
//! ./llm-system-fuction yarn-test --path-yarn /usr/bin/yarn -d path_dir_package_json -f path_file.test.js
//! `` `

extern crate serde;
extern crate serde_json;
mod errors;
mod functions;
use functions::{wrap_exec_command_yarn_test, wrap_file_content, wrap_resource_list};

use input::{Cli, Commands, Parser};
pub mod input {
    pub use clap::Parser;
    use clap::Subcommand;
    use std::path::PathBuf;
    use once_cell::sync::Lazy;
  
    static DEFAULT_PATH_DIR: Lazy<PathBuf> = Lazy::new(|| {
        dirs::home_dir().unwrap_or_else(|| PathBuf::from("/"))
    });

    /// Struct to hold the input arguments
    #[derive(Parser)]
    #[command(version, about, long_about = None)]
    pub struct Cli {
        #[command(subcommand)]
        pub command: Commands,
    }

    #[derive(Subcommand)]
    pub enum Commands {
        /// Show file contents
        #[command(name = "file-content", alias = "fc")]
        FileContent {
            #[arg(short = 'f', long = "path-file", value_name = "PATH_FILE")]
            path_file: PathBuf,
        },
        /// Show folder contents
        #[command(name = "resource-list", alias = "rl")]
        ResourceList {
            #[arg(short = 'd', long = "path-dir", value_name = "PATH_DIR", default_value_os = DEFAULT_PATH_DIR.as_os_str())]
            path_dir: PathBuf,
        },
        /// Command execute
        #[command(name = "yarn-test", alias = "yt")]
        CommandYarnTest {
            #[arg(short = 'p', long = "path-yarn", value_name = "PATH_YARN")]
            path_yarn: Option<PathBuf>,
            #[arg(short = 'd', long = "path-dir", value_name = "PATH_DIR_PACKAGE_JSON")]
            path_dir: PathBuf,
            #[arg(short = 'f', long = "path-file", value_name = "PATH_FILE")]
            path_file: PathBuf,
        },
    }
}
fn main() -> anyhow::Result<()> {
    let cli = Cli::parse();
    match &cli.command {
        Commands::FileContent { path_file } => {
            wrap_file_content(path_file);
        }
        Commands::ResourceList { path_dir } => {
            wrap_resource_list(path_dir);
        }
        Commands::CommandYarnTest {
            path_yarn,
            path_dir,
            path_file,
        } => {
            wrap_exec_command_yarn_test(path_yarn.as_ref(), path_dir, path_file);
        }
    }
    Ok(())
}
</code></pre>
