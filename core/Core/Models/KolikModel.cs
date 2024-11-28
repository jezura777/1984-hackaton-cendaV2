namespace Core.Models
{
    //Teplota, tlak, výška, vlhkost, světlo
    public class KolikModel
    {
        required public string Mac {  get; set; }
        required public double TeplotaV {  get; set; } //teplota vzduchu
        required public double Tlak { get; set; }   
        required public double Vyska {  get; set; }
        required public double Vlhkost {  get; set; }
        required public double Svetlo {  get; set; }
        //podzemniHodnoty
        required public double TeplotaZ {  get; set; } //teplota země
        required public double Voda {  get; set; }
        required public double Gps1 {  get; set; }
        required public double Gps2 {  get; set; }
    }
}
