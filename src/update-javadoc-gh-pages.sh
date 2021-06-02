# yatopia
# https://repo.codemc.io/service/rest/repository/browse/maven-public/org/yatopiamc/yatopia-api/1.16.5-R0.1-SNAPSHOT/
curl "https://repo.codemc.io/repository/maven-public/org/yatopiamc/yatopia-api/1.16.5-R0.1-SNAPSHOT/yatopia-api-1.16.5-R0.1-20210602.000505-263-javadoc.jar" -o "download.jar"
rm -r docs/yatopia
unzip download.jar -d docs/yatopia

rm download.jar