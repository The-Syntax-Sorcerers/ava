globalThis.template_data = {{ template_data | tojson | safe }}
console.log("GlobalThis set! \nTemplate Data ==", globalThis.template_data);