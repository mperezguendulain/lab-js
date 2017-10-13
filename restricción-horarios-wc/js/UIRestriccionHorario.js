function UIRestriccionHorario(container){
	this.container  = document.getElementById(container);

	if (this.container == null)
		console.error('No existe el container ' + container);

	this.initialize();
	this.drawForm();
}

UIRestriccionHorario.prototype.initialize = function(){
	console.log("ya empezamos");

	this.dias_index = [ false, false, false, false, false ];
	this.horas = { 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false };

};

UIRestriccionHorario.prototype.drawForm = function(){
	var self=this;
	var ID_TA = this.container.id + "-txt_json";
	var NDIAS = 5;
	var dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

	var cf = document.createElement('DIV');
	cf.className = "conteiner-form";

	// Dibujando los dias
	var tdias = document.createElement('H4');
	tdias.innerHTML = "Días";
	cf.appendChild(tdias);

	for (var i = 0; i < NDIAS; i++)
	{
		var btn = document.createElement('BUTTON');
		btn.className  = "btn btn-default";
		btn.id         = this.container.id + "-btnDia" + dias[i] + "_" + i;
		btn.innerHTML  = dias[i];

		btn.addEventListener('click', function(evt){
			self.modificaDiasIndex(evt.target.id, ID_TA);
			console.log("Clickeado dia con id "+ evt.target.id);
		});

		cf.appendChild(btn);
	}



	// Dibujando las horas
	var thoras = document.createElement('H4');
	thoras.innerHTML = "Horas:";
	cf.appendChild(thoras);

	for (var hora = 8; hora <= 19; hora++)
	{
		var btn = document.createElement('BUTTON');
		btn.className  = "btn btn-default";
		btn.id         = self.container.id + "-btnHora" + hora + "_" + hora;
		if(hora < 12)
			btn.innerHTML  =  hora + "am";
		else if(hora == 12)
			btn.innerHTML  = "12 pm";
		else
			btn.innerHTML  =  (hora  - 12) + " pm";

		btn.addEventListener('click', function(evt){
			self.modificaHoras(evt.target.id, ID_TA);
			console.log("Clickeado hora con id "+ evt.target.id);
		});

		cf.appendChild(btn);
	}

	// Dibujando el textarea
	this.container.appendChild(cf);

	cf.appendChild(document.createElement('BR'));
	cf.appendChild(document.createElement('BR'));

	var tstr_json = document.createElement('H5');
	tstr_json.innerHTML = "String JSON:";
	cf.appendChild(tstr_json);

	var cj = document.createElement('DIV');
	cj.className = "conteiner_json";

	var taJSON = document.createElement('TEXTAREA');
	taJSON.id = ID_TA;
	taJSON.className = "form-control";
	cj.appendChild(taJSON);

	cf.appendChild(cj);

};

// UTILS
UIRestriccionHorario.prototype.modificaDiasIndex = function(btn_id, id_ta_json)
{
	var self = this;
	var index = self.getIndexFromId(btn_id);
	if(self.dias_index[index])
	{
		self.dias_index[index] = false;
		self.desactivaBtn(btn_id);
		self.muestraStringJSONIndex(id_ta_json);
	}
	else
	{
		self.dias_index[index] = true;
		self.activaBtn(btn_id);
		self.muestraStringJSONIndex(id_ta_json);
	}
};

UIRestriccionHorario.prototype.getIndexFromId = function(btn_id)
{
	var array_temp = btn_id.split("_");
	return parseInt(array_temp[1]);
};

UIRestriccionHorario.prototype.muestraStringJSONIndex = function(id_ta_json) {
	var self = this;
	var str_json_dias = self.getStringJSON(self.dias_index);
	$("#" + id_ta_json).html("nodays: " + str_json_dias);
	var str_json_horas = self.getStringJSON(self.horas);
	$("#" + id_ta_json).append("\nnohours: " + str_json_horas);
};

UIRestriccionHorario.prototype.getStringJSON = function(json) {
	var json_temp = [];
	$.each(json, function (clave, valor) {
		if(valor)
			json_temp.push(clave);
	});
	return JSON.stringify(json_temp);
};

UIRestriccionHorario.prototype.desactivaBtn = function(btn_id) {
	$("#"+btn_id).removeClass( "btn-success" ).addClass( "btn-default" );
};

UIRestriccionHorario.prototype.activaBtn = function(btn_id) {
	$("#"+btn_id).removeClass( "btn-default" ).addClass( "btn-success" );
};

UIRestriccionHorario.prototype.modificaHoras = function(btn_id, id_ta_json)
{
	var self = this;
	var hora = self.getIndexFromId(btn_id);
	if(self.horas[hora])
	{
		self.horas[hora] = false;
		self.desactivaBtn(btn_id);
		self.muestraStringJSONIndex(id_ta_json);
	}
	else
	{
		self.horas[hora] = true;
		self.activaBtn(btn_id);
		self.muestraStringJSONIndex(id_ta_json);
	}
};
