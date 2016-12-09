function generate_attack_flight(enemy, points, callback) {
  tween = game.add.tween(enemy);
    tween.to(points, 2000, Phaser.Easing.Quadratic.InOut, true)
    .interpolation(function(v, k) {
        console.log("v "+v+" k "+k);
      return Phaser.Math.bezierInterpolation(v, k);
    });
  tween.onStart.add(callback);
  return tween;
}

function generate_points_from_enemy(enemy_num, group_num) {

        switch(enemy_num) {
            case 1: {
                console.log("1st enemy")
                return {'x':[400,240,420,500,600,700,300],
                        'y':[400,220,530,500,600,400,300]};
                break;
            }
            case 2: {
                return {'x':[100,300,120,550,500,600],
                        'y':[100,320,240,500,600,300]};
                break;
            }
            case 3: {
                return {'x':[600,500,320,350],
                        'y':[400,720,440,200]};
                break;
            }
            case 4: {
                return {'x':[600,200,420,650,850,200],
                        'y':[700,520,240,300,700,300]};
                break;
            }
            case 5: {
                return {'x':[200,400,720,550,400,400],
                        'y':[700,520,740,200,300,400]};
                break;
            }
            case 6: {
                return {'x':[100,400,820,850,600],
                        'y':[100,620,740,300,300]};
                break;
            }
            case 7: {
                return {'x':[300,400,500,600,700,600,500,600],
                        'y':[300,400,500,600,300,300,400,600]};
                break;
            }
            case 8: {
                return {'x':[700,700,620,550,400,200,400,300],
                        'y':[100,220,340,500,500,300,100,200]};
                break;
            }
            case 9: {
                return {'x':[700,700,300,300],
                        'y':[300,700,700,300]};
                break;
            }
        }
}

function generate_attacks(enemy, enemy_num, group_num, callback) {
    //enemy.completed = false;
  var points = generate_points_from_enemy(enemy_num, group_num);
  return generate_attack_flight(enemy, points, callback);
}
