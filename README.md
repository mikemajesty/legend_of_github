# legend_of_github

https://github.com/users/mikemajesty/contributions

C#
```
public string RenderRazorViewToString(string viewName, object model)
        {
            ViewData.Model = model;
            using (var sw = new StringWriter())
            {
                var viewResult = ViewEngines.Engines.FindPartialView(ControllerContext,
                                                                         viewName);
                var viewContext = new ViewContext(ControllerContext, viewResult.View,
                                             ViewData, TempData, sw);
                viewResult.View.Render(viewContext, sw);
                viewResult.ViewEngine.ReleaseView(ControllerContext, viewResult.View);
                return sw.GetStringBuilder().ToString();
            }
        }
        
          {
            using (var msOutput = new MemoryStream())
            {
                using (var stringReader = new StringReader(result))
                {
                    using (Document document = new Document())
                    {
                        var pdfWriter = PdfWriter.GetInstance(document, msOutput);
                        pdfWriter.InitialLeading = 12.5f;
                        document.Open();
                        var xmlWorkerHelper = XMLWorkerHelper.GetInstance();
                        var cssResolver = new StyleAttrCSSResolver();
                        var xmlWorkerFontProvider = new XMLWorkerFontProvider();
                        //foreach (string font in fonts)
                        //{
                        //    xmlWorkerFontProvider.Register(font);
                        //}
                        var cssAppliers = new CssAppliersImpl(xmlWorkerFontProvider);
                        var htmlContext = new HtmlPipelineContext(cssAppliers);
                        htmlContext.SetTagFactory(Tags.GetHtmlTagProcessorFactory());
                        PdfWriterPipeline pdfWriterPipeline = new PdfWriterPipeline(document, pdfWriter);
                        HtmlPipeline htmlPipeline = new HtmlPipeline(htmlContext, pdfWriterPipeline);
                        CssResolverPipeline cssResolverPipeline = new CssResolverPipeline(cssResolver, htmlPipeline);
                        XMLWorker xmlWorker = new XMLWorker(cssResolverPipeline, true);
                        XMLParser xmlParser = new XMLParser(xmlWorker);
                        xmlParser.Parse(stringReader);
                    }
                }
                return msOutput.ToArray();
            }
        }

        private static void DownloadPdf(HttpResponseBase Response, byte[] pdfByte)
        {
            Response.Clear();
            MemoryStream ms = new MemoryStream(pdfByte);
            ms.WriteTo(Response.OutputStream);
            Response.End();
        }

        private void AddResponseHeader(HttpResponseBase Response, string fileName)
        {
            Response.ContentType = "application/pdf";
            Response.ContentEncoding = Encoding.UTF8;
            Response.AddHeader("content-disposition", "attachment;filename=" + fileName);
            Response.Buffer = true;
        }
        
        
        string fileName = string.Format("PerfilClienteRelatorio_{0}.{1}", DateTime.Now.ToString("ddMMyyyymmss"), "pdf");
            
            var table = RenderRazorViewToString("PerfilClientePrint", response.Result);
            AddResponseHeader(Response, fileName);

            var pdfBytes = ConvertHtmltoPdf(table, fileName);
            DownloadPdf(Response, pdfBytes);
            
```
