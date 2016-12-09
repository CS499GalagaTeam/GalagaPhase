function generate_attack_flight(enemy, points, callback) {
  tween = game.add.tween(enemy.pl);
    tween.to(points, 2000, Phaser.Easing.Quadratic.InOut, true)
    .interpolation(function(v, k) {
        console.log("v "+v+" k "+k);
      return Phaser.Math.bezierInterpolation(v, k);
    });
  tween.onStart.add(callback);
  return tween;
}

function generate_points_from_enemy(enemy_num, group_num) {
    var window_height = game.width
  switch (group_num) {
    case 1:{
        switch(enemy_num) {
            case 1: {
                console.log("1st enemy")
                return {'x':[100,90,120,150,200,100],
                        'y':[100,120,140,200,100,90]};
                break;
            }
            case 2: {
                return [];
                break;
            }
            case 3: {
                return [];
                break;
            }
            case 4: {
                return [];
                break;
            }
            case 5: {
                return [];
                break;
            }
            case 6: {
                return [];
                break;
            }
            case 7: {
                return [];
                break;
            }
            case 8: {
                return [];
                break;
            }
        }
      break;
    }
    case 2:
        switch(enemy_num) {
            case 1: {
                return [];
                break;
            }
            case 2: {
                return [];
                break;
            }
            case 3: {
                return [];
                break;
            }
            case 4: {
                return [];
                break;
            }
            case 5: {
                return [];
                break;
            }
            case 6: {
                return [];
                break;
            }
            case 7: {
                return [];
                break;
            }
            case 8: {
                return [];
                break;
            }
        }
      break;
    case 3:
        switch(enemy_num) {
            case 1: {
                return [];   
                break;
            }
            case 2: {
                return [];   
                break;
            }
            case 3: {
                return [];   
                break;
            }
            case 4: {
                return [];   
                break;
            }
        }
      break;
    case 4:
        switch(enemy_num) {
            case 1: {
                return [];   
                break;
            }
            case 2: {
                return [];   
                break;
            }
            case 3: {
                return [];   
                break;
            }
            case 4: {
                return [];   
                break;
            }
        }
      break;
    case 5:
        switch(enemy_num) {
            case 1: {
                return [];   
                break;
            }
            case 2: {
                return [];   
                break;
            }
            case 3: {
                return [];   
                break;
            }
            case 4: {
                return [];   
                break;
            }
        }
      break;
  }
  return undefined;
}

function generate_attacks(enemy, enemy_num, group_num, callback) {
    enemy.pl.completed = false;
  var points = generate_points_from_enemy(enemy_num, group_num);
  return generate_attack_flight(enemy, points, callback);
}
