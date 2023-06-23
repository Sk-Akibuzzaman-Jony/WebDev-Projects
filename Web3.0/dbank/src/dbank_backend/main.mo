import Debug "mo:base/Debug";     //ignore the warning....This mo:base/Debug allows us to use the print function so that we can use the print to debug 
import Time "mo:base/Time";
import Float "mo:base/Float"
actor DBank{
  stable var currentValue: Float = 300; // this stable keyword preserves the prev state of the varible even after we stop everything and restart the code
  //currentValue := 100; //this operator ":=" is used to "reassign" or change the values

  stable var startTime = Time.now();
  //startTime := Time.now();

  let id = 87184019283491;

  //Debug.print(debug_show(id));

  public func topUp(amount : Float){
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  public func withdrawl(amount : Float){
    let temp: Float = currentValue-amount;
    if(temp >= 0){
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    } else {
      Debug.print("Amout too large, currentValue less than 0");
    }
  }; 

  public query func checkBalance(): async Float {      
    return currentValue; 
  };
  //to learn abour query and update function --> see lec 423 
  //query funtions are basically used when we want a very very fast return and the funtions does not modify any values , the above funtions (i.e. topUp and withdrawl) are update they take some time to return as they have to update the cannisters in the chain.

  public func compound(){
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS/1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));
    startTime := currentTime;
  }



  //in order to call this funtion from the terminal we can use this statement
  // dfx canister call dbank topUp
  // if there are args in the funtions then use this format dfx canister call hello greet '("everyone")' where "everyone" is an args
  // if while calling a funtion from the terminal gives error 3 then stop everything and then delete the .dfx file & then do it again(dfx start->dfx deploy->then call the funtion)

  //in order to use candidUI to call the funtions in the browser click the links that come at the bottom after hittinh dfx deploy


}