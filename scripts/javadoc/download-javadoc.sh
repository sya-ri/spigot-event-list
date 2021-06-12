function downloadJavadoc {
  dist="javadoc/$1"
  url="$2"
  curl "$url" -o "download.jar"
  if [ -e $dist ]; then
    rm -r "$dist"
  fi
  mkdir -p "$dist"
  unzip download.jar -d "$dist"
  rm download.jar
}
