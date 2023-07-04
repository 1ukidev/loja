{ pkgs ? import <nixpkgs> {} }:

let
  php = pkgs.php82.buildEnv {
    extraConfig = ''
      ; extension=${pkgs.php82Extensions.mysqli}/lib/php/extensions/mysqli.so
      ; extension=${pkgs.php82Extensions.pdo_mysql}/lib/php/extensions/pdo_mysql.so
    '';
  };
in
pkgs.mkShell {
  buildInputs = [
    php
  ];

  shellHook = ''
    echo
    echo "'mysql -u root -p < cegonha.sql' to create database in mysql"
    echo
    php -S 0.0.0.0:8000 -t web/.
  '';
}
