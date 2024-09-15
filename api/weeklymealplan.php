<?php
class WeeklyMeal
{
    function saveWeeklyPlan($json)
    {
        include "connection.php";

        //default values lang ni sya
        $startDate = null;
        $lastDayOfWeek = null;
        $user_id = null;
        $data = [];

        // Decode nato ang JSON
        if (!empty($json)) {
            //dri na part ang atung gi pangalan sa variable sa decode kay "data"
            $data = json_decode($json, true);
            //dri na part kay silbi boolean ni sya 
            //check niya na naka set ba ang "$data['startDate'])"na part kung true so iyang ibutang ang gi input if false iyang e null
            $startDate = isset($data['startDate']) ? $data['startDate'] : null;
            $lastDayOfWeek = isset($data['lastDayOfWeek']) ? $data['lastDayOfWeek'] : null;
            $user_id = isset($data['user_id']) ? $data['user_id'] : null;
        }

        // Check if ang required data is available
        if (empty($startDate) || empty($lastDayOfWeek)) {
            return 0; //if empty ni sila duha or isa ani nila mo error sya which is mo return value sya ug 0
        }

        // Create DateTime objects para sa start and end dates
        $startDateTime = new DateTime($startDate);
        $endDateTime = new DateTime($lastDayOfWeek);

        // Initialize an array to map day numbers to day names
        // nag butang ta ug empty sa first kay ang array kay nag sugod man sa 0 tapus ang atung form sa html ky nag sugod man sa day1-day7 so ug walaon nato ma null ang data's sa isa ka day wich is sunday kay kato man sya ang ma zero sa array 
        $dayNames = ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        // Insert the weekly sa weekly_daily_tbl
        $sql = "INSERT INTO weekly_daily_tbl (week_start, week_end, user_id) VALUES (:week_start, :week_end, :user_id)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":week_start", $startDate);
        $stmt->bindParam(":week_end", $lastDayOfWeek);
        $stmt->bindParam(":user_id", $user_id);

        // Check if the insert was successful
        if (!$stmt->execute()) {
            return 0; // same atung una na kung ma 0 gali ni it means error
        }

        // gi set nato ang last inserted Id kay para sa unya na porpose
        $weeklyPlanId = $conn->lastInsertId();

        // Iterate over the days and insert daily meal plans
        //kaning current date copy ni sya sa "startDateTime" which is indicates the first day of the week
        $currentDate = clone $startDateTime;

        //nag gamit tag while loop para mag continue lang ang process hantud sa ang "currentDate" kay ma equal na sya sa "enddate"
        while ($currentDate <= $endDateTime) {
            $dayNumber = $currentDate->format('w')+1; //"w" represents a format code that is used to extract the day of the week as a number. 
            $dayName = $dayNames[$dayNumber]; // dri kay gi kuha nato ang dayName

            // Ensure that $breakfast, $lunch, and $dinner exist and are valid recipe_id values
            // same ra gyapun ni sya tung gi buhat nato sa first na boolean
            $breakfast = isset($data["breakfast{$dayNumber}"]) ? $data["breakfast{$dayNumber}"] : null;
            $lunch = isset($data["lunch{$dayNumber}"]) ? $data["lunch{$dayNumber}"] : null;
            $dinner = isset($data["dinner{$dayNumber}"]) ? $data["dinner{$dayNumber}"] : null;

            $sql = "INSERT INTO dailyplantbl (day_name, date, breakfast, lunch, dinner, weeklydaily_id, user_id) ";
            $sql .= "VALUES (:day_name, :date, :breakfast, :lunch, :dinner, :weeklydaily_id, :user_id)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":day_name", $dayName);
            $stmt->bindParam(":date", $currentDate->format('Y-m-d'));
            $stmt->bindParam(":breakfast", $breakfast);
            $stmt->bindParam(":lunch", $lunch);
            $stmt->bindParam(":dinner", $dinner);
            $stmt->bindParam(":weeklydaily_id", $weeklyPlanId);// dri dayon to nato gi butang tung lastinsertedId nato ganina
            $stmt->bindParam(":user_id", $user_id);

            if (!$stmt->execute()) {
                return 0;
            }
            $currentDate->modify('+1 day');// kani sya ang mag add ug 1 sa date nato
            //example: "2023-10-10" mahimo nana sya ug "2023-10-11"
        }

        return 1; 
    }


}

$json = isset($_POST['json']) ? $_POST['json'] : "";
$operation = isset($_POST['operation']) ? $_POST['operation'] : "";

$dailymeal = new WeeklyMeal();
switch ($operation) {
    case "saveWeeklyPlan":
        echo $dailymeal->saveWeeklyPlan($json);
        break;
    default:
        echo "Invalid operation";
}

?>
