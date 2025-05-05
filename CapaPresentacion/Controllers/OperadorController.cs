using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CapaPresentacion.Controllers
{
    public class OperadorController : Controller
    {
        // GET: Operador
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult FormularioEmisionAOCR()
        {
            ViewBag.SoloLectura = false; // Para llenar el formulario
            return PartialView("~/Views/Views_Partial/_FormularioEmisionAOCR.cshtml");
        }

        public ActionResult ConsultarEmisionAOCR(int id)
        {
            ViewBag.SoloLectura = true; // Para solo visualizar
            return PartialView("~/Views/Views_Partial/_FormularioEmisionAOCR.cshtml");
        }



    }
}