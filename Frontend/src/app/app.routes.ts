import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { EquansComponent } from './components/clients/equans/equans.component';
import { AkzonobelComponent } from './components/clients/akzonobel/akzonobel.component';
import { OlympicComponent } from './components/clients/olympic/olympic.component';
import { BaxterComponent } from './components/clients/baxter/baxter.component';
import { GskComponent } from './components/clients/gsk/gsk.component';
import { LabimaComponent } from './components/clients/labima/labima.component';
import { FibComponent } from './components/clients/fib/fib.component';
import { CreditGeneralComponent } from './components/clients/credit-general/credit-general.component';
import { EngieComponent } from './components/clients/engie/engie.component';
import { TottSystemsComponent } from './components/clients/tott-systems/tott-systems.component';
import { JpassComponent } from './components/clients/jpass/jpass.component';
import { SopresComponent } from './components/clients/sopres/sopres.component';
import { TplanComponent } from './components/clients/tplan/tplan.component';
import { TransnubelComponent } from './components/clients/transnubel/transnubel.component';
import { SchenkComponent } from './components/clients/schenk/schenk.component';
import { CocaColaComponent } from './components/clients/coca-cola/coca-cola.component';
import { KjsComponent } from './components/clients/kjs/kjs.component';
import { EditorComponent } from './components/editor/editor.component';
import { MsalGuard } from '@azure/msal-angular';
import { LoginFailedComponent } from './components/login-failed/login-failed.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { ListComponent } from './components/list/list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'main', component: MainComponent },
    { path: 'list', component: ListComponent, canActivate: [MsalGuard] },
    { path: 'editor/:slug?', component: EditorComponent, canActivate: [MsalGuard] },
    { path: 'viewer/:slug', component: ViewerComponent },
    { path: 'login-failed', component: LoginFailedComponent },
    { path: 'clients/equans', component: EquansComponent },
    { path: 'clients/akzonobel', component: AkzonobelComponent },
    { path: 'clients/olympic', component: OlympicComponent },
    { path: 'clients/baxter', component: BaxterComponent },
    { path: 'clients/gsk', component: GskComponent },
    { path: 'clients/labima', component: LabimaComponent },
    { path: 'clients/fib', component: FibComponent },
    { path: 'clients/credit-general', component: CreditGeneralComponent },
    { path: 'clients/engie', component: EngieComponent },
    { path: 'clients/tott-systems', component: TottSystemsComponent },
    { path: 'clients/jpass', component: JpassComponent },
    { path: 'clients/sopres', component: SopresComponent },
    { path: 'clients/tplan', component: TplanComponent },
    { path: 'clients/transnubel', component: TransnubelComponent },
    { path: 'clients/schenk', component: SchenkComponent },
    { path: 'clients/coca-cola', component: CocaColaComponent },
    { path: 'clients/kjs', component: KjsComponent }
];
