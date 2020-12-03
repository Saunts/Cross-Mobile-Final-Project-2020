import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email: string=""
  constructor(
    public afAuth: AngularFireAuth, 
    private router:Router, 
    public alertController: AlertController, 
    public loadingCtrl: LoadingController,
    public toastr: ToastController
  ) { }

  ngOnInit() {
  }

  async resetpassword(){
    if(this.email){
      const loading = await this.loadingCtrl.create({
        message: "Mengirim kode untuk reset password...",
        spinner: 'crescent',
        showBackdrop: true
      });
      loading.present();
      this.afAuth.sendPasswordResetEmail(this.email).then(()=>{
        loading.dismiss();
        this.toast('Silakan cek email Anda!','success');
        this.router.navigate(['auth/login']);
      }).catch((error)=>{
        loading.dismiss();
        if(error.message == 'The email address is badly formatted.'){
          this.toast('Email tidak valid', 'danger');  
        }else if(error.message=='There is no user record corresponding to this identifier. The user may have been deleted.'){
          this.toast('Email tidak terdaftar', 'danger');  
        }else{
          this.toast(error.message,'danger');
        }
        console.log(error.message);
      })
    }else{
      this.toast('Invalid Email','danger');
    }
  }

  async toast(message, status){
    const toast = await this.toastr.create({
      message: message,
      position: 'top',
      color: status,
      duration: 2000
    });

    toast.present();
  }

}
