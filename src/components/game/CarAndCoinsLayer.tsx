import React, { memo, useContext } from "react";
import CarEnemy from "./CarEnemy";
import { ResourcesContext } from "../../constants/ResourcesContext";
import Coin from "./Coin";
enum CoinPositions {
  first = -40,
  second = 130,
  third = 300,
  fourth = 470,
}

enum CarsPositions {
  first = 30,
  second = 200,
  third = 370,
  fourth = 540,
}
const emptyOrIs = () => Math.random() < 0.5;
const ONE_CAR_DISTANCE_Y_COORDINATE = 500;
const randomNumberFromOneToSix = () => Math.floor(Math.random() * 6) + 1;

export const CarAndCoinsLayer = memo(() => {
  const { resources } = useContext(ResourcesContext);

  const randomGenerator = (position: number, skipCoin = false) => {
    const booleanKeys = [emptyOrIs(), emptyOrIs(), emptyOrIs(), emptyOrIs()];
    let counter: number;
    let coinCounter = 0;

    // @ts-ignore
    let notMoreThenThreeElements = booleanKeys.reduce((acc, current) => {
      counter += 1;
      if (counter > 3) {
        return [...acc, false];
      }
      return [...acc, current];
    }, []);

    const yRandomPosition = () => -ONE_CAR_DISTANCE_Y_COORDINATE * position;

    if (notMoreThenThreeElements.every((item: any) => item)) {
      notMoreThenThreeElements = [];
    }
    const positionsForCoins = notMoreThenThreeElements.map((current: any) => {
      if (coinCounter) {
        return false;
      }
      if (current) {
        return false;
      }

      if (!current) {
        coinCounter += 1;
        return true;
      }
      return false;
    });

    return (
      <>
        {!skipCoin && (
          <>
            {positionsForCoins[0] && (
              <Coin
                xCoordinate={CoinPositions.first}
                yCoordinate={yRandomPosition()}
                texture={resources.roadCoin.texture}
              />
            )}
            {positionsForCoins[1] && (
              <Coin
                xCoordinate={CoinPositions.second}
                yCoordinate={yRandomPosition()}
                texture={resources.roadCoin.texture}
              />
            )}
            {positionsForCoins[2] && (
              <Coin
                xCoordinate={CoinPositions.third}
                yCoordinate={yRandomPosition()}
                texture={resources.roadCoin.texture}
              />
            )}
            {positionsForCoins[3] && (
              <Coin
                xCoordinate={CoinPositions.fourth}
                yCoordinate={yRandomPosition()}
                texture={resources.roadCoin.texture}
              />
            )}
          </>
        )}
        {notMoreThenThreeElements[0] && (
          <CarEnemy
            xCoordinate={CarsPositions.first}
            yCoordinate={yRandomPosition()}
            // @ts-ignore
            texture={resources[`car${randomNumberFromOneToSix()}`].texture}
          />
        )}
        {notMoreThenThreeElements[1] && (
          <CarEnemy
            xCoordinate={CarsPositions.second}
            yCoordinate={yRandomPosition()}
            // @ts-ignore
            texture={resources[`car${randomNumberFromOneToSix()}`].texture}
          />
        )}
        {notMoreThenThreeElements[2] && (
          <CarEnemy
            xCoordinate={CarsPositions.third}
            yCoordinate={yRandomPosition()}
            // @ts-ignore
            texture={resources[`car${randomNumberFromOneToSix()}`].texture}
          />
        )}
        {notMoreThenThreeElements[3] && (
          <CarEnemy
            xCoordinate={CarsPositions.fourth}
            yCoordinate={yRandomPosition()}
            // @ts-ignore
            texture={resources[`car${randomNumberFromOneToSix()}`].texture}
          />
        )}
      </>
    );
  };

  return (
    <>
      {randomGenerator(1)}
      {randomGenerator(2, true)}
      {randomGenerator(3, true)}
      {randomGenerator(4, true)}
      {randomGenerator(5, true)}
      {randomGenerator(6)}
      {randomGenerator(7)}
      {randomGenerator(8, true)}
      {randomGenerator(10)}
      {randomGenerator(13)}
      {randomGenerator(14)}
      {randomGenerator(15, true)}
      {randomGenerator(16)}
      {randomGenerator(17, emptyOrIs())}
      {randomGenerator(18, emptyOrIs())}
      {randomGenerator(19, emptyOrIs())}
      {randomGenerator(20, emptyOrIs())}
      {randomGenerator(21, emptyOrIs())}
      {randomGenerator(22, emptyOrIs())}
      {randomGenerator(23, emptyOrIs())}
      {randomGenerator(25, emptyOrIs())}
      {randomGenerator(27, emptyOrIs())}
      {randomGenerator(28)}
      {randomGenerator(32)}
      {randomGenerator(34)}
      {randomGenerator(36)}
      {randomGenerator(38)}
      {randomGenerator(40)}
      {randomGenerator(41)}
      {randomGenerator(43)}
    </>
  );
});
