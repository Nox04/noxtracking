git pull;
docker-compose down --remove-orphans;
docker rmi $(docker images | grep '^<none>' | awk '{print $3}');
docker-compose -f ./docker-compose-prod.yml up -d --remove-orphans --build;
