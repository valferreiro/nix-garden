{
  description = "nix-garden development shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in {
        devShells.default = pkgs.mkShell {
          name = "dev";

          packages = with pkgs; [
						nodejs_24
						typescript-language-server
						emmet-ls
						vscode-langservers-extracted
          ];
        };
      }
    );
}
