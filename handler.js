let timeSelect = triggerGui.getElementsByClassName("timeSelect")[0];

getTriggerConfiguration(() => {
  return {
    text: "time past " + timeSelect.value,
    data: {
      hours: timeSelect.value.split(":")[0],
      minutes: timeSelect.value.split(":")[1],
    },
  };
});
