{ pkgs ? import <nixpkgs> {} }:

# NIXPKGS_ALLOW_UNFREE=1 nix-shell
# ANDROID_HOME=~/Android/Sdk yarn expo start
(pkgs.buildFHSUserEnv {
  name = "shell";
  targetPkgs = pkgs: (with pkgs; [ nodejs nodePackages.npm yarn android-studio libpulseaudio
    xorg.libX11 zlib libGL nss nspr expat xorg.libXcomposite xorg.libXcursor xorg.libXdamage
    xorg.libXext xorg.libXfixes xorg.libXi xorg.libXrender xorg.libXtst alsa-lib libuuid openjdk ]);
}).env
