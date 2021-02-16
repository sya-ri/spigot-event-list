# yatopia
curl "https://repo.codemc.io/repository/maven-public/org/yatopiamc/yatopia-api/1.16.5-R0.1-SNAPSHOT-staging/yatopia-api-1.16.5-R0.1-SNAPSHOT-staging-javadoc.jar" -o "download.jar"
rm -r docs/yatopia
unzip download.jar -d docs/yatopia

rm download.jar